import styled from 'styled-components'

export const ContactPageStyle = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
  margin-top: 8%;

  // variables won't work
  :root {
    --white: #f4f4f4;
    --black: #666666;
  }

  * {
    font-family: 'Roboto', sans-serif;
    /* background: var(--white); */
    /* color: var(--black); */
    // does not cover entire page
    background: #f4f4f4;
    color: #222222;
  }

  p {
    font-size: 1.2rem;
  }

  .divider {
    display: flexbox;
    height: 400px;
    width: 2px;
    background: #aaaaaa;
  }
`

export const EmailForm = styled.div`
  float: left;
  margin-left: 5%;
  width: 40%;

  input {
    background: #ffffff;
    width: 60%;
    height: 1.3rem;
  }

  #message {
    height: 5rem;
  }
`

export const Field = styled.div`
  margin-bottom: 1rem;
`
export const ContactPoint = styled.div`
  display: flexbox;
  margin-top: 1rem;
  p {
    margin-left: 2rem;
    // doesn't work but should be slightly thicker
    font-weight: 400;
  }

  .icon {
    width: 1.1rem;
    height: 1.1rem;
    vertical-align: middle;
  }
`
