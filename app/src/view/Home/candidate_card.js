import React from "react";
import { Card } from "antd";

const CandidateCard = ({ image, id, name_en, name, history }) => {
  return (
    <Card
      hoverable
      style={{ width: 240, borderRadius: "5px" }}
      cover={<img alt={name} src={image} />}
      onClick={() => history.push(`/vote/${name_en}`)}
    >
      <Card.Meta title={name} description={"คะแนน : 0"} />
    </Card>
  );
};

export default CandidateCard;
