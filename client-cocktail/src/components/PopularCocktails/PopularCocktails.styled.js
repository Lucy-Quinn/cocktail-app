import styled from 'styled-components';

const PopularDrinksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const CocktailWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CocktailImage = styled.img`
    width: auto;
    height: 200px;
`;

export {
  PopularDrinksWrapper, 
  CocktailWrapper,
  CocktailImage
}
