import styled from 'styled-components';

const CocktailsByNameWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  opacity: ${({loadedCocktails, cocktailData}) => (loadedCocktails.length === cocktailData?.length || cocktailData === null ? 1 : 0)};
  p{
  opacity: 1;
  }
`;


export {
    CocktailsByNameWrapper,
}
