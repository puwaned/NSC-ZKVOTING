import React from "react";
import { Row, Col } from "antd";
import CandidateCard from "./candidate_card";
import { candidates } from "../../tools";

const Home = (props) => {
  const renderCandidateCard = () => {
    return candidates.map((item, index) => {
      return (
        <Col
          xs={24}
          md={6}
          key={index}
          className="d-flex justify-content-center"
        >
          <CandidateCard {...item} {...props} />
        </Col>
      );
    });
  };

  return (
    <div className="p-3 bg-white d-flex flex-column justify-content-center align-items-center h-100">
      <h3 className="pb-5">กดที่รูปภาพเพื่อเริ่มทำการลงคะแนน</h3>
      <Row className="w-100">{renderCandidateCard()}</Row>
    </div>
  );
};

export default Home;
