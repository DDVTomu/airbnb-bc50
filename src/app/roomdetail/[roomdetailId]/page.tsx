import { fetchAPI } from "@/lib/api";
import "font-awesome/css/font-awesome.min.css";
import Image from "next/image";
import DatePicker from "@/components/DatePicker/page";
import Comments from "@/components/Comments/page";
const fetchRoomData = async (id: any) => {
  const response = await fetchAPI(`/phong-thue/${id}`);
  return response.content;
};

const fetchCommentData = async (id: any) => {
  const response = await fetchAPI(`/binh-luan/lay-binh-luan-theo-phong/${id}`);
  return response.content;
};

const fetchLocationData = async (id: any) => {
  const response = await fetchAPI(`/vi-tri/${id}`);
  return response.content;
};

export default async function RoomFullDetail(props: any) {
  const roomId = props.params.roomdetailId;

  const calcRating = async (id: any) => {
    let total = 0;
    let oneStar = 0;
    let twoStar = 0;
    let threeStar = 0;
    let fourStar = 0;
    let fiveStar = 0;
    const response = await fetchCommentData(id);
    if (response?.length > 0) {
      response?.map((rate: any) => {
        if (rate.saoBinhLuan === 5) {
          fiveStar += 1;
        } else if (rate.saoBinhLuan < 5 && rate.saoBinhLuan >= 4) {
          fourStar += 1;
        } else if (rate.saoBinhLuan < 4 && rate.saoBinhLuan >= 3) {
          threeStar += 1;
        } else if (rate.saoBinhLuan < 3 && rate.saoBinhLuan >= 2) {
          twoStar += 1;
        } else if (rate.saoBinhLuan < 2 && rate.saoBinhLuan >= 1) {
          oneStar += 1;
        }
      });
      total =
        (1 * oneStar +
          2 * twoStar +
          3 * threeStar +
          4 * fourStar +
          5 * fiveStar) /
        response?.length;
    }
    return total.toFixed(1);
  };

  const getAvgRating = async (room: any) => {
    const ratingAsString = await calcRating(room);
    const rating = parseFloat(ratingAsString);

    if (!isNaN(rating)) {
      return rating;
    } else {
      return 0;
    }
  };

  const roomDetail = await fetchRoomData(roomId);
  const roomComment = await fetchCommentData(roomId);
  const roomLocation = roomDetail.maViTri
    ? await fetchLocationData(roomDetail.maViTri)
    : "";
  const roomRating = await getAvgRating(roomId);
  return (
    <main>
      <div className="h-28"></div>
      <div className="container mx-auto px-20">
        <div>
          <p>
            <button className="mr-3">
              <svg
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Tiêu đề được dịch tự động: Sharma Springs 5 bds Hồ bơi Dinh thự tre sang trọng"
                role="img"
                focusable="false"
                style={{
                  display: "inline-block",
                  height: "24px",
                  width: " 24px",
                  fill: "currentcolor",
                }}
              >
                <path d="M9 0a1 1 0 0 1 .993.883L10 1v5h5a1 1 0 0 1 .993.883L16 7v8a1 1 0 0 1-.883.993L15 16H7a1 1 0 0 1-.993-.883L6 15v-5H1a1 1 0 0 1-.993-.883L0 9V1A1 1 0 0 1 .883.007L1 0h8zm1.729 7l-1.393.495.233.217.13.132c.125.127.227.245.308.352l.073.103.048.073.045.077H7.308v1.309h1.207l.166.52.09.266.112.29a6.294 6.294 0 0 0 1.109 1.789c-.495.315-1.119.607-1.87.87l-.331.112-.346.108-.445.134L7.72 15l.407-.125.386-.128c1.007-.349 1.836-.752 2.486-1.214.57.405 1.277.764 2.12 1.08l.369.134.386.128.406.125.72-1.153-.445-.134-.26-.08-.345-.115c-.783-.27-1.43-.57-1.94-.895a6.3 6.3 0 0 0 1.068-1.694l.128-.32.114-.33.165-.521h1.208V8.449H11.64l-.093-.231a3.696 3.696 0 0 0-.554-.917l-.126-.149-.14-.152zm1.35 2.758l-.042.133-.076.224-.103.264A4.985 4.985 0 0 1 11 11.76a4.952 4.952 0 0 1-.743-1.127l-.115-.254-.103-.264-.076-.224-.042-.133h2.158zM9 1H1v8h5V7c0-.057.005-.113.014-.167H3.827L3.425 8H2l2.257-6h1.486l1.504 4H9V1zM5 3.411L4.253 5.6h1.502L5 3.411z"></path>
              </svg>
            </button>
            <span className="font-semibold text-xl sm:text-3xl tracking-widest leading-relaxed text-gray-900">
              {roomDetail.tenPhong}
            </span>
          </p>
          <div className="flex flex-wrap justify-between items-center">
            <div>
              <span className="text-sm font-normal tracking-widest">
                <i className="fa fa-star"></i> {roomRating} .
              </span>{" "}
              <span className="underline text-sm font-normal tracking-widest mx-1">
                {roomComment.length} đánh giá
              </span>
              .
              <span className="text-sm font-normal tracking-widest mx-1">
                {" "}
                <i className="fa-solid fa-award"></i> Chủ nhà siêu cấp .
              </span>
              <span className="underline text-sm font-normal tracking-widest mx-1">
                {roomLocation?.tenViTri}, {roomLocation?.tinhThanh},{" "}
                {roomLocation?.quocGia}
              </span>
            </div>
            <div className="flex flex-wrap justify-center items-center">
              <button className="px-2 py-1 hover:bg-gray-100 rounded-md transition-all duration-150 flex justify-center items-center font-semibold text-sm text-gray-700">
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "inline-block",
                    fill: "none",
                    height: "16px",
                    width: "16px",
                    stroke: "currentcolor",
                    strokeWidth: "2",
                    overflow: "visible",
                  }}
                >
                  <g fill="none">
                    <path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9"></path>
                    <path d="M16 3v23V3z"></path>
                    <path d="M6 13l9.293-9.293a1 1 0 0 1 1.414 0L26 13"></path>
                  </g>
                </svg>
                <span className="ml-2">Chia sẻ</span>
              </button>
              <button className="px-2 py-1 hover:bg-gray-100 rounded-md transition-all duration-150  flex justify-center items-center font-semibold text-sm text-gray-700">
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "inline-block",
                    fill: "none",
                    height: "16px",
                    width: "16px",
                    stroke: "currentcolor",
                    strokeWidth: "2",
                    overflow: "visible",
                  }}
                >
                  <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
                </svg>
                <span className="ml-2">Lưu</span>
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5">
          <div className="rounded-l-xl rounded-r-xl sm:rounded-r-none overflow-hidden">
            <Image
              src={roomDetail.hinhAnh}
              className="w-full object-contain rounded-l-xl overflow-hidden"
              width={684}
              height={456}
              alt=""
              style={{ imageRendering: "pixelated", objectFit: "contain" }}
            />
          </div>
          <div className="hidden sm:grid sm:grid-cols-2 gap-2 ">
            <div>
              <Image
                src={roomDetail.hinhAnh}
                width={338}
                height={225.33}
                className="w-full h-full"
                alt=""
              />
            </div>
            <div className="hidden md:block rounded-tr-xl overflow-hidden">
              <Image
                src={roomDetail.hinhAnh}
                width={338}
                height={225.33}
                className="w-full h-full rounded-tr-xl overflow-hidden"
                alt=""
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="rounded-r-xl overflow-hidden md:rounded-none">
              <Image
                src={roomDetail.hinhAnh}
                width={338}
                height={225.33}
                className="w-full h-full"
                alt=""
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="hidden md:block rounded-br-xl overflow-hidden">
              <Image
                src={roomDetail.hinhAnh}
                width={338}
                height={225.33}
                className="w-full h-full rounded-br-xl overflow-hidden"
                alt=""
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
        <DatePicker
          data={roomDetail}
          rating={roomRating}
          comment={roomComment}
        />
        <Comments data={roomDetail} rating={roomRating} comment={roomComment} />
      </div>
    </main>
  );
}
