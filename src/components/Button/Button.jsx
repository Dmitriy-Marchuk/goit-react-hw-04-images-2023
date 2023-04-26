import { ButtonStyled } from './Button.styled';

const ButtonLoadMore = ({ onClick }) => {
  return (
    <ButtonStyled type="button" onClick={onClick}>
      Load more
    </ButtonStyled>
  );
};

export default ButtonLoadMore;
