import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.192);
  backdrop-filter: blur(10px);
  height: 250px;
  width: 20%;
  margin-top: 30px;
  margin-right: 20px;
  margin-left: 20px;
  border-radius: 15px;
  padding: 20px;
  border: 1px solid rgba(43, 43, 43, 0.568);
`;

export const CurrentScore = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #525000;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const HighScore = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #525000;
  margin-top: 20px;
  margin-bottom: 20px;
`;
