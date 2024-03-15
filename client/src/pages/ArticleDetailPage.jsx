import styled from "styled-components";
import DateUtils from "../utils/DateUtils";

const StyledWrapper = styled.div`
  .articleDetail {
    display: flex;
    flex-direction: column;
    padding: 8rem;
    @media (max-width: 768px) {
      padding: 1.5rem;
    }
  }
  .articleWrapper {
    margin-top: 2rem;
  }
  iframe {
    width: 100%;
    max-width: 1500px;
    height: 500px;
  }
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
  }
  p {
    font-size: 1.35rem;
  }
`;

export default function ArticleDetailPage(props) {
  return (
    <StyledWrapper>
      <div className="articleDetail" key={props.articlesData?.id}>
        <div className="articleWrapper">
          <iframe
            src={`https://www.youtube.com/embed/${props.getArticleIdFromUrl(props.articlesData?.originalLink)}`}
            title="YouTube article player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <h1>{props.articlesData?.name}</h1>
        <p>{props.articlesData?.description}</p>
        <p>Owner: {props.articlesData?.owner?.name}</p>
        <p>Episode: {props.articlesData?.episode}</p>
        <p>Materials: {props.articlesData?.materials}</p>
        <p>Created: {DateUtils.getAgeFromDate(new Date(props.articlesData?.createdAt))} ago</p>
      </div>
    </StyledWrapper>
  );
}
