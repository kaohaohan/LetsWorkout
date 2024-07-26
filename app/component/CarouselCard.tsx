"use client";
import React from "react";
import Workplan from "./Workplan";
import { Carousel, StepProps } from "antd";
import styled from "styled-components";

// Define a style object for the content inside the carousel
const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

// Why use styled-components?
// The default CarouselCard in antd is transparent, so I need to change its color.
// Styled-components helps me customize the CarouselCard's styles.
const StyledCarousel = styled(Carousel)`
  & .slick-arrow {
    color: black;
  }
`;

// Define the props interface for the CarouselCard component
//? means that props is optional
interface CarouselCardProps {
  beforeChange?: (current: number, next: number) => void;
  data: Array<{
    date: string;
    plan: Array<{
      title: string;
      status: StepProps["status"];
    }>;
  }>;
}

const defaultBeforeChange = (current: number, next: number) => {};

// CarouselCard component
//if I dont do anything, give the defaultBeforeChange.
const CarouselCard: React.FC<CarouselCardProps> = ({
  beforeChange = defaultBeforeChange,
  data,
}) => {
  return (
    <StyledCarousel arrows infinite={false} beforeChange={beforeChange}>
      {data.map((workout, index) => {
        return <Workplan date={workout.date} plan={workout.plan} key={index} />;
      })}
    </StyledCarousel>
  );
};
export default CarouselCard;
