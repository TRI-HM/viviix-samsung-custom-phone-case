import React from "react";
import "./styles.css";
import { appendObjJson } from "../../utils/localStorage";
import { Center } from "../../components/center";

const RegisterPage = () => {
  //get value input
  const inputHandler = (e) => {
    appendObjJson({ [e.target.name]: e.target.value });
  };
  return (
    <>
      <Center>

        {/* trong đoạn code này, sau khi chạy inputHandler thì sẽ lấy được value của input sau đó giá trị được gán lại cho value bằng value = inputValue.name.  
            thông thường sau khi lấy giá trị (vd: submit một form)* thì giá trị sẽ được đặt lại thành rỗng để điền tiếp thông tin */}

        <input
          name="name"
          type="text"
          placeholder="Nhập tên"
          onBlur={inputHandler}
        />
        {/* <input name="phone" type="text" placeholder="Số điện thoại"
              onBlur={inputHandler} /> */}
      </Center>
    </>
  );
};

export default RegisterPage;
