import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { GET_USER } from "../../App";
import { client } from "../apollo";

const CREATE_USER = gql`
    mutation($name: String!) {
        createUser(name: $name) {
            id
            name
        }
    }
`;

export const NewUserForm = () => {

    const [name, setName] = useState('');
    const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
    
    async function handleCreateUser(event: FormEvent){
        event.preventDefault();

        if(!name) {
            return;
        }

        await createUser({ 
            variables: { 
                name 
            },
            // refetchQueries: [GET_USER]  //faz uma nova requisição para obter os dados atualizados
            update: (cache, { data: { createUser } }) => {
                const { users } = client.readQuery({ query: GET_USER});

                cache.writeQuery({
                    query: GET_USER,
                    data: {
                        data: {
                            users: [...users, createUser]
                        }
                    }
                });


            }
        });

    }

    return (
        <form onSubmit={handleCreateUser}>
            <input type="text" value={name} onChange={ (event) => setName(event.target.value)} />
            <button type="submit">Criar Usuário</button>
        </form>
    );
}