import React, { Component } from 'react';
import { Mutation, Query } from "react-apollo";
import gql from 'graphql-tag';
import Router from 'next/router'
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import { number } from 'prop-types';
import Error from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!)  {
        item(where: { id: $id }) {
            id
            title
            description
            price 
        }
    }
`;

const UPDATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUATATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
    ) {
        updateItem(
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
        ) {
            id
        }
    }
`;

class UpdateItem extends Component {
    state = {};

    handleChange = (e) => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;

        this.setState({
            [name]: val
        });
    }

    render() {
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
                {({ data, loading }) => {
                    return (

            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
            {(updateItem, { loading, error }) => (
                <Form onSubmit={async (e) => {
                    // stope form from submitting
                    e.preventDefault();
                    // call the mutation
                    const res = await updateItem();
                    // chnage them to the single item page
                    Router.push({
                        pathname: '/item',
                        query: { id: res.data.updateItem.id }
                    })
                }}>
                    <Error error={error} />
                    <fieldset disabled={loading} aria-busy={loading}>
                        <label>
                            Title
                            <input 
                                type="text" 
                                id="title" 
                                name="title" 
                                placeholder="Title" 
                                required value={this.state.title} 
                                onChange={this.handleChange} />
                        </label>

                        <label>
                            Price
                            <input 
                                type="number" 
                                id="price" 
                                name="price" 
                                placeholder="Price" 
                                required value={this.state.price} 
                                onChange={this.handleChange} />
                        </label>

                        <label>
                            Description
                            <textarea 
                                type="text" 
                                id="description" 
                                name="description" 
                                placeholder="Enter a description" 
                                required value={this.state.description} 
                                onChange={this.handleChange} />
                        </label>

                        <button type="submit">Submit</button>
                    </fieldset>
                </Form>
            )}
            </Mutation>
                                )
                            }}
                        </Query>
        );
    }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION }