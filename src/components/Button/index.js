import styled from 'styled-components';
import { Button as AntButton } from 'antd';

export const ButtonLogin = styled.button`
    border: 0;
    border-radius: 2px;
    width: 100%;
    height: 32px;
    padding: 0 20px;
    font-size: 16px;
    font-weight: bold;
    background: #f05a5b;
    color: #fff;
    cursor: pointer;

    &:houver{
        background: #e14f50;
    }
`;

export const RemoveButton = styled(AntButton)`
  position: absolute !important;
  top: 25% !important;
  right: 2% !important;
`
export const EditButton = styled(AntButton)`
  position: absolute !important;
  top: 6% !important;
  right: 2% !important;
`