"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import StarRatingComponent from "react-rating-stars-component";
import { postAPI } from "@/lib/api";
import * as Yup from "yup";

export default function Comments(props: any) {
  const roomDetails = props.data;
  const roomComments = props.comment;
  const roomRating = props.rating;

  const [user, setUser] = useState("");
  const commentSchema = Yup.object().shape({
    comment: Yup.string().required("Xin hãy nhập bình luận trước khi đăng"),
  });

  useEffect(() => {
    const userData = localStorage.getItem("userInfo");
    if (userData) {
      let value;
      value = JSON.parse(localStorage.getItem("userInfo") || "");
      setUser(value);
    }
  }, []);
  const [raiting, setRaiting] = useState(1);
  const onStarClick = (nextValue: any, prevValue: any, name: any) => {
    setRaiting(nextValue);
    props.raiting(nextValue);
  };
  const onStarHover = (nextValue: any, prevValue: any, name: any) => {
    setRaiting(nextValue);
    props.raiting(nextValue);
  };

  const handleSubmit = async (values: any) => {
    const comment = {
      maPhong: roomDetails.id,
      maNguoiBinhLuan: user?.user.id,
      ngayBinhLuan: new Date(),
      noiDung: values.comment,
      saoBinhLuan: values.rating,
    };

    const rawResponse = await postAPI(
      "binh-luan",
      JSON.stringify(comment, null, 2),
      user?.token
    );

    if (rawResponse.statusCode == "200" || rawResponse.statusCode == "201") {
      alert(`cám ơn bạn đã bình luận!`);
      window.location.reload();
    } else {
      console.log(rawResponse);
      alert(`Bình luận Không thành công (Nguyên nhân: ${rawResponse.content})`);
    }
  };

  return (
    <div className="mt-10 pb-5 border-b">
      <div>
        <h2 className="font-semibold text-gray-800 text-xl pb-4 flex items-center">
          <div className="flex items-center">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "inline-block",
                height: 16,
                width: 16,
                fill: "currentcolor",
              }}
            >
              <path
                d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"
                fillRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-2">{roomRating} . </div>
          <div className="ml-2">{roomComments.length} đánh giá</div>
        </h2>

        {user ? (
          <Formik
            initialValues={{
              comment: "",
              rating: raiting,
            }}
            validationSchema={commentSchema}
            onSubmit={handleSubmit}
          >
            <Form className="mb-6">
              <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <Field
                  as="textarea"
                  id="comment"
                  name="comment"
                  rows={6}
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="Viết bình luận ở đây..."
                  defaultValue={""}
                />
              </div>
              <label htmlFor="rating">Sao dánh giá</label>
              <Field name="rating">
                {({ field }) => (
                  <div>
                    <StarRatingComponent
                      size={50}
                      value={field.value} // Use 'field.value' to get the rating value
                      starCount={5}
                      name="rating"
                      onStarClick={onStarClick}
                      onStarHover={onStarHover}
                      onChange={(newValue: any) => {
                        setRaiting(newValue);
                        field.onChange({
                          target: { name: "rating", value: newValue },
                        }); // Update the form field value
                      }}
                    />
                  </div>
                )}
              </Field>

              <button
                type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Đăng bình luận
              </button>
            </Form>
          </Formik>
        ) : (
          <div className="mb-6">
            Bạn hãy{" "}
            <a
              href="/account/login"
              className="underline font-semibold text-base tracking-wider text-gray-800"
            >
              Đăng nhập
            </a>{" "}
            hoặc{" "}
            <a
              href="/account/register"
              className="underline font-semibold text-base tracking-wider text-gray-800"
            >
              Đăng ký
            </a>{" "}
            để được bình luận.
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-4">
        <div className="flex justify-between items-center">
          <div className="w-full text-base tracking-wide text-gray-700">
            Mức độ sạch sẽ
          </div>
          <div className="w-1/2 flex justify-between items-center">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-gray-800 h-1 rounded-full"
                style={{ width: "100%" }}
              />
            </div>
            <div className="ml-4">5,0</div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-full text-base tracking-wide text-gray-700">
            Độ chính xác
          </div>
          <div className="w-1/2 flex justify-between items-center">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-gray-800 h-1 rounded-full"
                style={{ width: "100%" }}
              />
            </div>
            <div className="ml-4">5,0</div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-full text-base tracking-wide text-gray-700">
            Giao tiếp
          </div>
          <div className="w-1/2 flex justify-between items-center">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-gray-800 h-1 rounded-full"
                style={{ width: "100%" }}
              />
            </div>
            <div className="ml-4">5,0</div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-full text-base tracking-wide text-gray-700">
            Vị trí
          </div>
          <div className="w-1/2 flex justify-between items-center">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-gray-800 h-1 rounded-full"
                style={{ width: "95%" }}
              />
            </div>
            <div className="ml-4">4,9</div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-full text-base tracking-wide text-gray-700">
            Nhận phòng
          </div>
          <div className="w-1/2 flex justify-between items-center">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-gray-800 h-1 rounded-full"
                style={{ width: "100%" }}
              />
            </div>
            <div className="ml-4">5,0</div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-full text-base tracking-wide text-gray-700">
            Giá trị
          </div>
          <div className="w-1/2 flex justify-between items-center">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-gray-800 h-1 rounded-full"
                style={{ width: "100%" }}
              />
            </div>
            <div className="ml-4">5,0</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-20 gap-y-4 sm:w-4/5 mt-5">
        {roomComments.map((comment: any) => (
          <div className="mb-5">
            <div className="flex items-center">
              <div>
                {comment.avatar ? (
                  <Image
                    src={comment.avatar}
                    alt=""
                    width={100}
                    height={100}
                    className="w-10 h-10 rounded-full overflow-hidden shadow-lg"
                  />
                ) : (
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    className="text-gray-500"
                    style={{
                      display: "block",
                      height: 40,
                      width: 40,
                      fill: "currentcolor",
                    }}
                  >
                    <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-base tracking-wide text-gray-900">
                  {comment.tenNguoiBinhLuan}
                </h4>
                <span className="font-normal text-sm text-gray-500">
                  {comment.ngayBinhLuan}
                </span>
              </div>
            </div>
            <div className="text-gray-800 tracking-wider">
              <p>{comment.noiDung}</p>
            </div>
          </div>
        ))}

        {/* <div className="sm:col-span-2">
          <button className="border border-solid border-gray-900 hover:bg-gray-100 transition-all duration-200 rounded-md px-5 py-3 font-semibold text-base text-gray-800 tracking-wider">
            Hiển thị tất cả 120 đánh giá
          </button>
        </div> */}
      </div>
    </div>
  );
}
