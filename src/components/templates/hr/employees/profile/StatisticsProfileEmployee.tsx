import defaultImage from "../../../../../assets/global/default.png";
import emailIcon from "../../../../../assets/global/icons/black_email.png";
import flagIcon from "../../../../../assets/global/icons/flag.svg";
import phoneIcon from "../../../../../assets/global/icons/phone.svg";
const StatisticsProfileEmployee = ({ data }: any) => {
  return (
    <>
      <div className="card xl:mb-6">
        <div className="card-body pt-9 pb-0 profile-cover">
          <div>
            <div className="flex flex-wrap justify-center sm:justify-start text-center text-sm-start">
              <div className="px-0 mb-3">
                <a href={defaultImage}>
                  <img
                    className="text-center text-sm-start rounded-[50%] "
                    width="75px"
                    height="75px"
                    src={defaultImage}
                    alt="name"
                  />
                </a>
              </div>

              <div className="px-0 mb-3 statistics-profile">
                <h2 className="title-contain text-start mx-2 text-sm-start">
                  {data?.name}
                </h2>
                <ul className="data-list data-list-center">
                  <li>
                    <a href="#">
                      <img src={flagIcon} alt="" className="w-6 h-6" />

                      <span>{data?.id}</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={phoneIcon} alt="" className="w-6 h-6" />

                      <span>{data?.phone}</span>
                    </a>
                  </li>
                </ul>
              </div>
              {/*  */}
            </div>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1.2rem] gap-y-6">
            {/* <CardProfileStudent data={data?.profile} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticsProfileEmployee;
