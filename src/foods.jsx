/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

import { Button, Modal, Form, Select, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import {
  addFood,
  getFoodsByDay,
  getFoodsInRange,
  calculateNutritionalInfo,
} from "./functions";

export function Foods({ data, ingredients, recipes, notifyAdded }) {
  const [modalAdd, setModalAdd] = useState(false);

  const [dataSearched, setDataSearched] = useState(data);

  const [nutritionalInfo, setNutritionalInfo] = useState({
    carbs: 0,
    sugars: 0,
    fats: 0,
    proteins: 0,
    calories: 0,
  });

  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  useEffect(() => {
    const mNut = calculateNutritionalInfo(dataSearched, recipes, ingredients);
    setNutritionalInfo(mNut);
  }, [data, dataSearched, ingredients, recipes]);

  const onSearchStart = (val) => {
    if (!val) {
      setDateStart("");
      if (dateEnd == "") {
        setDataSearched(data);
      } else {
        const foods = getFoodsByDay(JSON.parse(JSON.stringify(data)), dateEnd);
        setDataSearched(foods);
      }
    } else {
      const date = val.$M + 1 + "/" + val.$D + "/" + val.$y;
      if (dateEnd != "") {
        const foods = getFoodsInRange(
          JSON.parse(JSON.stringify(data)),
          date,
          dateEnd
        );
        setDataSearched(foods);
      } else {
        const foods = getFoodsByDay(JSON.parse(JSON.stringify(data)), date);
        setDataSearched(foods);
      }
      setDateStart(date);
    }
  };

  const onSearchEnd = (val) => {
    if (!val) {
      setDateEnd("");
      if (dateStart == "") {
        setDataSearched(data);
      } else {
        const foods = getFoodsByDay(
          JSON.parse(JSON.stringify(data)),
          dateStart
        );
        setDataSearched(foods);
      }
    } else {
      const date = val.$M + 1 + "/" + val.$D + "/" + val.$y;
      if (dateStart != "") {
        const foods = getFoodsInRange(
          JSON.parse(JSON.stringify(data)),
          dateStart,
          date
        );
        setDataSearched(foods);
      } else {
        const foods = getFoodsByDay(JSON.parse(JSON.stringify(data)), date);
        setDataSearched(foods);
      }
      setDateEnd(date);
    }
  };

  const addButtonHandler = () => {
    setModalAdd(!modalAdd);
  };

  const handleCancel = () => {
    addButtonHandler();
  };

  const handleOk = () => {
    addButtonHandler();
  };

  const optionsRec = recipes.map((rec) => ({
    label: rec.name,
    value: rec.id,
  }));

  const onSubmit = (values) => {
    const date =
      values.date.$D + "/" + (values.date.$M + 1) + "/" + values.date.$y;
    const newData = addFood(
      JSON.parse(JSON.stringify(data)),
      date,
      values.recipe
    );
    notifyAdded(newData);
    handleOk();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "16px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "8px", fontWeight: "bold" }}>
            Start date:
          </div>
          <DatePicker onChange={onSearchStart} />
          <div
            style={{
              marginLeft: "16px",
              marginRight: "8px",
              fontWeight: "bold",
            }}
          >
            End date:
          </div>
          <DatePicker onChange={onSearchEnd} />
        </div>
        <div>
          <Button
            type="primary"
            onClick={() => addButtonHandler()}
            icon={<PlusOutlined />}
          >
            Register Meal
          </Button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: "16px",
          alignItems: "center",
          borderTop: "1px solid #ddd",
          paddingBottom: "16px",
          paddingTop: "16px",
        }}
      >
        <div
          style={{ fontSize: "18px", fontWeight: "bold" }}
        >{`Total Nutrition: `}</div>
        <div style={{ marginLeft: "16px" }}>
          <span style={{ fontWeight: "bold" }}>{`Calories: `}</span>
          {`${nutritionalInfo.calories}`}
        </div>
        <div style={{ marginLeft: "16px" }}>
          <span style={{ fontWeight: "bold" }}>{`Carbs: `}</span>
          {`${nutritionalInfo.carbs}`}
        </div>
        <div style={{ marginLeft: "16px" }}>
          <span style={{ fontWeight: "bold" }}>{`Sugars: `}</span>
          {`${nutritionalInfo.sugars}`}
        </div>
        <div style={{ marginLeft: "16px" }}>
          <span style={{ fontWeight: "bold" }}>{`Fats: `}</span>
          {`${nutritionalInfo.fats}`}
        </div>
        <div style={{ marginLeft: "16px" }}>
          <span style={{ fontWeight: "bold" }}>{`Proteins: `}</span>
          {`${nutritionalInfo.proteins}`}
        </div>
      </div>

      <div style={{ borderTop: "1px solid #ddd" }}>
        {dataSearched.map((food, i) => {
          const mNutri = calculateNutritionalInfo([food], recipes, ingredients);
          return (
            <div
              key={food.id}
              style={{
                display: "flex",
                borderBottom: "1px solid #ddd",
                paddingTop: "8px",
                paddingBottom: "8px",
                justifyContent: "space-between",
                backgroundColor: i % 2 == 0 ? "white" : "#eee",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
            >
              <div style={{ display: "flex" }}>
                <span style={{ fontWeight: "bold" }}>{`${food.day}: `}</span>
                <div style={{ marginLeft: "8px" }}>{`${food.recipe}`}</div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ marginLeft: "16px" }}>
                  <span style={{ fontWeight: "bold" }}>{`Calories: `}</span>
                  {`${mNutri.calories}`}
                </div>
                <div style={{ marginLeft: "16px" }}>
                  <span style={{ fontWeight: "bold" }}>{`Carbs: `}</span>
                  {`${mNutri.carbs}`}
                </div>
                <div style={{ marginLeft: "16px" }}>
                  <span style={{ fontWeight: "bold" }}>{`Sugars: `}</span>
                  {`${mNutri.sugars}`}
                </div>
                <div style={{ marginLeft: "16px" }}>
                  <span style={{ fontWeight: "bold" }}>{`Fats: `}</span>
                  {`${mNutri.fats}`}
                </div>
                <div style={{ marginLeft: "16px" }}>
                  <span style={{ fontWeight: "bold" }}>{`Proteins: `}</span>
                  {`${mNutri.proteins}`}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        title="Add Food"
        open={modalAdd}
        onOk={handleOk}
        onCancel={handleCancel}
        footer=""
      >
        <Form onFinish={onSubmit}>
          <Form.Item label="Date" name="date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Recipe" name="recipe" rules={[{ required: true }]}>
            <Select showSearch options={optionsRec} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
