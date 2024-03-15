import styled from 'styled-components';

const StyledArticleList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 1rem;
  padding: 1rem 2rem;
  margin: 0 auto;
  overflow: hidden;

  .gridItem {
    border-radius: 1rem;
    border: 1px solid black;
    border-radius: 1rem;
    padding: 1rem;
    .iframeWrapper {
        position: relative;
        padding-top: 56.25%; /* 16:9 aspect ratio */
      }
      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 1rem;
      }
  }
  button {
    width: 48%;
    transform: translateX(-1.5%);
  }
  .editButton {
    background-color: #3c6ca8;
  }
  h3 {
    margin-top: 1rem;
  }
  p {
    color: grey;
    font-weight: 700;
    font-size: 1.2rem;
  }
`;

export default function ArticleGrid({ children }) {
  return (
    <StyledArticleList>
      {children}
    </StyledArticleList>
  );
}
