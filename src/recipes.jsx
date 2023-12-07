/* eslint-disable react/prop-types */

import React, { useState } from "react";

import { Button, Modal, Form, InputNumber, Input } from "antd";

import {
  addRecipe,
  /*
  searchIngredients,
  orderIngredients,
  filterIngredients,
  orderRecipes,
  filterRecipes,
  searchRecipes,
  countNumberOfTimesAnIngredientIsUsed,
  getIngredientsInCommon,
  getFoodsByDay,
  getFoodsInRange,
  calculateNutritionalInfo
  */
} from "./functions";

export function Recipes({ data, notifyAdded }) {
  const [modalAdd, setModalAdd] = useState(true);

  const addButtonHandler = () => {
    setModalAdd(!modalAdd);
  };

  const handleCancel = () => {
    addButtonHandler();
  };

  const handleOk = () => {
    addButtonHandler();
  };

  const onSubmit = (values) => {
    const newData = addRecipe(
      JSON.parse(JSON.stringify(data)),
      values.id,
      values.name,
      values.calories,
      values.proteins,
      values.carbs,
      values.fats,
      values.sugars,
      values.gramsPerRation
    );
    notifyAdded(newData);
    handleOk();
  };

  return (
    <div>
      <Button onClick={() => addButtonHandler()} type="primary">
        Add
      </Button>
      <div>
        {data.map((ing) => (
          <div key={ing.id}>{ing.name}</div>
        ))}
      </div>

      <Modal
        title="Add Recipes"
        open={modalAdd}
        onOk={handleOk}
        onCancel={handleCancel}
        footer=""
      >
        <Form onFinish={onSubmit}>
          <Form.Item label="ID" name="id" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Input name..." />
          </Form.Item>
          <Form.Item
            label="Calories"
            name="calories"
            rules={[{ required: true }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Proteins"
            name="proteins"
            rules={[{ required: true }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item label="Carbs" name="carbs" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Fats" name="fats" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Sugars" name="sugars" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Grams Per Ration"
            name="gramsPerRation"
            rules={[{ required: true }]}
          >
            <InputNumber />
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
