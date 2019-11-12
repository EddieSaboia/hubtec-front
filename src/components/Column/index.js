import styled from 'styled-components';

export const ColumnButton = styled.div`
    width: 100%;
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
`

export const ColumnButtonActions = styled.div`
    width: 100%;
    list-style: none;
    display: flex;
    grid-template-columns: 1fr ;
    grid-gap: 20px;
`

export const ContainerButtons = styled.div`
display: flex;
justify-content: space-between;
`