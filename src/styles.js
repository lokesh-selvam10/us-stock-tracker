import styled from 'styled-components';

export const Header = styled.div`
background-color: ${props => props.theme.background};
min-height: 100vh;
color: ${props => props.theme.color};
`;

export const AppLink = styled.a`
	color: ${props => props.theme.linkColor};
`;
