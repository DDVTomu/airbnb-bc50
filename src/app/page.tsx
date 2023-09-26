import dynamic from 'next/dynamic';
import { fetchAPI } from '@/lib/api'
import 'font-awesome/css/font-awesome.min.css';
import RoomSwiper from '@/components/RoomSwiper/page';
// const RoomSwiper = dynamic(() => import('@/components/RoomSwiper/page'), { ssr: false })

const fetchRoomData = async () => {
  const response = await fetchAPI("phong-thue");
  return response
};

const fetchCommentData = async (id:any) => {
  const response = await fetchAPI(`/binh-luan/lay-binh-luan-theo-phong/${id}`);
  return response
};

export default async function Home() {
  const data  = await fetchRoomData();

  const calcRating =  async(id:any) =>{
    let total = 0;
    let oneStar = 0;
    let twoStar = 0;
    let threeStar = 0;
    let fourStar = 0;
    let fiveStar = 0;
    const response = await fetchCommentData(id);
    if(response?.content.length > 0){
      response?.content.map((rate:any) => 
      {
        if(rate.saoBinhLuan === 5){
          fiveStar += 1
        }else if(rate.saoBinhLuan < 5 && rate.saoBinhLuan >= 4){
          fourStar += 1;
        }else if(rate.saoBinhLuan < 4 && rate.saoBinhLuan >= 3){
          threeStar += 1;
        }else if(rate.saoBinhLuan < 3 && rate.saoBinhLuan >= 2){
          twoStar += 1;
        }else if(rate.saoBinhLuan < 2 && rate.saoBinhLuan >= 1){
          oneStar += 1;
        }
      }
    )
    total = ((1 * oneStar) + (2 * twoStar) + (3 * threeStar) + (4 * fourStar) + (5 * fiveStar)) / response?.content.length;
    }
    return total.toFixed(1);
  }

  const getAvgRating = async (room: any) => {
    const ratingAsString = await calcRating(room);
    const rating = parseFloat(ratingAsString);
  
    if (!isNaN(rating)) {
      return rating;
    } else {
      return 0;
    }
  }

  const getAvgRatings = async (rooms:any) => {
    const ratings = await Promise.all(
      rooms.map(async (room:any) => {
        const rating = await getAvgRating(room.id);
        return rating;
      })
    );
    return ratings;
  };


  const renderRooms = async (data : any) => {
    if (data) {
      const avgRatings:any = await getAvgRatings(data.content);

      return(
        data.content?.map((room:any, index:any) => {
          const rating = avgRatings[index];
          if(room.tenPhong != ""){
            return(
              <a className="roomLink" href={`/roomdetail/${room.id}`}>
                <div >
                  <RoomSwiper image={room.hinhAnh}/>
                    <p className="flex justify-between mt-2">
                      <span className="font-bold" style={{flex: "1 1 75%"}}>{room.tenPhong}</span>
                      <span className="text-right"style={{flex: "1 1 25%"}} ><i className="fa fa-star"></i> {rating}</span>
                    </p>
                    <p className="text-gray-500">441 km</p>
                    <p className="text-gray-500">Ngày 21 - Ngày 17 tháng 3</p>
                    <p className="mt-1"><span className="font-bold">${room.giaTien}</span> đêm</p>
                </div>
              </a>
                )
          }

        })
      )

    }
  };

  if(data){}
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-10">
        { await renderRooms(data) }
      </div>
      </div>
      
    </main>
  )
}
