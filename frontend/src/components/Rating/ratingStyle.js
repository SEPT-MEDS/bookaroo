import styled from 'styled-components'

export const RatingText = styled.span`
  color: ${p => p.theme.greyText};

  .unfilled {
    filter: grayscale(1);
  }
`
