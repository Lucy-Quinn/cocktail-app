import styled from 'styled-components';

const PopularDrinksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  opacity: ${({ loadedCocktails, cocktailData }) =>
    loadedCocktails.length === cocktailData.length ? 1 : 0};
`;

export { PopularDrinksWrapper };
