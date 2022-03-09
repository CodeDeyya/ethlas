import styled from 'styled-components';

export const Container = styled.div`
  display: ${({ display }) => {
    if (display) return 'flex';
    return 'none';
  }};
  flex-direction: column;
  position: absolute;
  bottom: 45vh;
  left: 45vw;

  width: 300px;
  height: 250px;
  background-image: url('assets/ui/board.png');
  background-size: cover;
  background-size: 100% 100%;
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  padding: 10px;
  height: 30px;
  padding-right: 40px;
  padding-left: 40px;
  justify-content: space-between;
  align-items: space-between;
`;

export const Title = styled.div`
  color: #ffffff;
  font-size: 20px;
  font-family: 'Shadows Into Light', cursive;
  text-align: center;
  width: 200px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;
  margin-top: 80px;
`;
