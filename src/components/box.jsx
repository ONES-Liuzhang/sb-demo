import styled from "styled-components";

const BoxContainer = styled.div`
  padding: 20px;
`;

const Box = (props) => {
  const { title, children, desc = '' } = props;

  return (
    <BoxContainer>
      <h2>{title}</h2>
      <pre>{desc}</pre>
      <div className="box-container">{children}</div>
    </BoxContainer>
  );
};

export default Box;
