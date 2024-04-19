import styled from 'styled-components';
import AllArticlesComponent from '../components/AllArticlesComponent';
import { useRef } from 'react';

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100svh;
    border-radius: 1rem;
    background-image: black;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    @media (max-width: 768px) {
        padding: 0 2rem;
    }
    @media (max-width: 1920px) {
        background-size: 90%;
    }

    h1 {
        font-size: 4rem;
        margin-bottom: 1rem;
        @media (max-width: 768px) {
            font-size: 3.3rem;
        }
    }

    p {
        color: rgb(235, 222, 222);
        font-weight: 700;
        font-size: 2rem;
        @media (max-width: 768px) {
            font-size: 1.5rem;
        }
    }

    span {
        background: -webkit-linear-gradient(#5c5c5c, #dddddd, #5c5c5c);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 1000;
    }

    .btn {
        margin: 2rem;
        padding: 1rem 3.5rem;
        text-align: center;
        text-transform: uppercase;
        transition: 0.5s;
        background-size: 200% auto;
        color: white;
        border-radius: 0.5rem;
        font-weight: 700;
        letter-spacing: 2px;
    }

    .btn:hover {
        background-position: right center; /* change the direction of the change here */
    }

    .btn-1 {
        background-image: linear-gradient(to right, #5c5c5c 0%, #dddddd 50%, #5c5c5c 100%);
    }
`;

function HomePage(props) {
    const ArticleRef = useRef(null);
    const scrollToArticles = () => {
        const offset = 150; // velikost navbaru v pixelech
        const elementPosition = ArticleRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    };
    return (
        <>
            <StyledWrapper >
                <h1>Welcome to <span>ServerRoomWatch</span></h1>
                <p>{props.description}</p>
                <button className="btn btn-1" onClick={scrollToArticles}>Explore</button>
            </StyledWrapper>
                <div ref={ArticleRef}></div>
            {/*<AllArticlesComponent/>*/}
        </>
    );
}
export default HomePage;
