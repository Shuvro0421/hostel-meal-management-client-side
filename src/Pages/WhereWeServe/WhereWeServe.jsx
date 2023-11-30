import Marquee from "react-fast-marquee";

const WhereWeServe = () => {
    return (
        <div className="md:py-10 py-6">
            <Marquee>
                <div>
                    <img className="md:w-96 w-40 h-20 md:h-60" src={'https://bauet.ac.bd/ice/wp-content/uploads/sites/9/2022/06/BAUET-Campus-Back-side-1-scaled.jpg'} alt="" />
                </div>
                <div>
                    <img className="md:w-96 w-40 h-20 md:h-60" src={'https://ecdn.dhakatribune.net/contents/cache/images/1200x630x1xxxxx1x694528/uploads/dten/2022/04/06/web-du-1538553399512-156173.jpeg?watermark=media%2F2023%2F05%2F28%2F1280px-Dhaka_Tribune_Logo.svg-1-a9e61c86dded62d74300fef48fee558f.png'} alt="" />
                </div>
                <div>
                    <img className="md:w-96 w-40 h-20 md:h-60" src={'https://wp.bssnews.net/wp-content/uploads/2019/10/BUET.jpg'} alt="" />
                </div>
                <div>
                    <img className="md:w-96 w-40 h-20 md:h-60" src={'https://www.ru.ac.bd/wp-content/uploads/2022/02/science.jpg'} alt="" />
                </div>
            </Marquee>
        </div>
    );
};

export default WhereWeServe;