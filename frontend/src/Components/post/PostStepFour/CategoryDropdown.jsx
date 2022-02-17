import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Dropdown } from "react-dropdown-now";
import { categoryAtom } from "../PostAtom/PostAtom";
import { useRecoilState } from "recoil";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { dropDownOptionsState } from "../../../states/ViewAllAtom";
const CategoryDropdown = () => {
  const [category, setCategory] = useRecoilState(categoryAtom);
  const dropDownOptions = useRecoilValue(dropDownOptionsState);
  const setDropDownOptions = useSetRecoilState(dropDownOptionsState);
  const [recipe, setRecipe] = useState([]);
  const clearDropDownOptions = (e) => {
    const defaultName = document.querySelectorAll(".rdn-control-placeholder");
    const defaultNameList = ["종류", "재료", "상황", "방법"];
    defaultName.forEach((item, index) => {
      item.innerText = defaultNameList[index];
    });

    setDropDownOptions(() => ({
      category: "",
      material: "",
      condition: "",
      cook: "",
    }));
  };

  useEffect(() => {
    const defaultName = document.querySelectorAll(".rdn-control-placeholder");
    const defaultCategory = ["category", "material", "condition", "cook"];
    const defaultNameList = ["종류", "재료", "상황", "방법"];

    defaultName.forEach((item, index) => {
      if (!dropDownOptions[defaultCategory[index]]) {
        item.innerText = defaultNameList[index];
      } else {
        item.innerText = dropDownOptions[defaultCategory[index]];
        const title = item.innerText;
      }
    });
  });
  const getRecipe = (value) => {
    // if (value === Dropdown.options) console.log("change!", value, dropDownOptions);

    console.log(value.value);
  };
  return (
    <>
      <DropdownWrapper>
        <Dropdown
          className="category"
          placeholder="종류"
          options={["한식", "중식", "일식", "아시안", "양식", "기타"]}
          onChange={getRecipe}
          onSelect={(value) => {
            setDropDownOptions((dropDownValues) => ({
              ...dropDownValues,
              category: value.value,
              material: "",
              condition: "",
              cook: "",
            }));
          }} // always fires once a selection happens even if there is no change
        />

        <Dropdown
          placeholder="재료"
          options={["육류", "채소류", "해물류", "과일류", "달걀/유제품", "기타"]}
          value="one"
          onChange={getRecipe}
          onSelect={(value) => {
            setDropDownOptions((dropDownValues) => ({
              ...dropDownValues,
              category: "",
              material: value.value,
              condition: "",
              cook: "",
            }));
          }} // always fires once a selection happens even if there is no change
        />
        <Dropdown
          placeholder="상황"
          options={[
            "파티",
            "주말에 혼먹",
            "근사하게",
            "다이어트",
            "영양식",
            "야식",
            "간식",
            "초스피드",
            "기타",
          ]}
          value="one"
          onChange={getRecipe}
          onSelect={(value) => {
            setDropDownOptions((dropDownValues) => ({
              ...dropDownValues,
              category: "",
              material: "",
              condition: value.value,
              cook: "",
            }));
          }} // always fires once a selection happens even if there is no change
        />
        <Dropdown
          placeholder="방법"
          options={["볶음", "무침", "비빔", "끓이기", "굽기", "삶기", "튀김", "기타"]}
          className="last"
          value="one"
          onChange={getRecipe}
          onSelect={(value) => {
            setDropDownOptions((dropDownValues) => ({
              ...dropDownValues,
              category: "",
              material: "",
              condition: "",
              cook: value.value,
            }));
          }} // always fires once a selection happens even if there is no change
        />
      </DropdownWrapper>
      <Line />
    </>
  );
};

export default CategoryDropdown;

const ButtonWrapper = styled.div`
  margin: 12px 0px;
  & > button {
    width: 95px;
    height: 45px;
    color: white;
    border: 2px solid #feae11;
    border-radius: 50px;
    line-height: 36px;
    font-size: 16px;
    font-weight: 900;

    &:first-child {
      margin-right: 16px;
    }
  }
`;
const Line = styled.div`
  width: 360px;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.14);
`;
const DropdownWrapper = styled.div`
  display: flex;
  margin: 14px 0;
  justify-content: center;
  & > div {
    width: 76px;
    height: 36px;
    border: 2px solid #feae11;
    border-radius: 50px;
    line-height: 36px;
    font-size: 13px;
    font-weight: 900;
    color: #feae11;

    &:not(:last-child) {
      margin-right: 8px;
    }
    & > div:not(:first-child) {
      background-color: white;
      width: 120px;
      z-index: 100;
      color: #feae11;
      transform: translateY(-5px) translateX(10px);
      border-radius: 10px;
      border: 2px solid #feae11;
    }
    .last:not(:first-child) {
      transform: translateY(-5px) translateX(-60px);
    }
    .situation:nth-child(2) > :nth-child(3) {
      font-size: 13px;
    }
  }
`;
