"use client";

import { MagicCard } from "@/components/card/MagicCard";
import { WavePercent } from "@/components/percent/WavePercent";
import { useEffect, useState } from "react";
import { AreaBarChart } from "@/components/chart/AreaBarChart";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/carousel/Carousel";

import Autoplay from "embla-carousel-autoplay";

const BanJinPage = () => {
  const [cardData, setCardData] = useState<any>(null);
  const [chartData, setChartData] = useState<any>([
    { date: 0, qutstanding: 0, completed: 0 },
  ]);

  // 获取图表数据
  const getChartData = async () => {
    const res = await fetch(
      "http://10.0.20.61:8068/Board/M93GetWorkcenterInfo",
      {
        method: "GET",
      }
    );

    if (!res) return;

    const { data } = await res.json();

    const result = data.reduce((a: any, b: any) => {
      if (!a[b.type]) {
        a[b.type] = {};
      }
      if (!a[b.type][b.date]) {
        a[b.type][b.date] = { date: b.date, completed: 0, qutstanding: 0 };
      }
      a[b.type][b.date].completed += b.completed;
      a[b.type][b.date].qutstanding += b.qutstanding;
      return a;
    }, {});

    // 将对象转换为数组
    for (let type in result) {
      result[type] = Object.values(result[type]);
    }

    setChartData(result);
  };

  const getCardData = async () => {
    try {
      const res = await fetch(
        "http://10.0.20.61:8068/Board/M90GetWorkcenterInfo",
        {
          method: "GET",
        }
      );
      if (!res) return;

      const { data } = await res.json();

      if (!data) return;

      const result = data
        .map((item: any) => {
          return {
            ...item,
            percent:
              item.qutstanding === 0 && item.completed === 0
                ? 0
                : Math.round(
                    (item.completed / (item.qutstanding + item.completed)) * 100
                  ),
          };
        })
        .reduce((a: any, b: any) => {
          if (!a[b.type]) {
            a[b.type] = [];
          }
          a[b.type].push(b);
          return a;
        }, {});

      console.log(result);
      setCardData(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCardData();
    getChartData();

    const dataInterval = setInterval(() => {
      getCardData();
      getChartData();
    }, 30000);

    // 清除定时器
    return () => {
      clearInterval(dataInterval);
    };
  }, []);
  return (
    <>
      <div className="w-full h-full">
        <Carousel
          plugins={[
            Autoplay({
              delay: 15000,
            }),
          ]}
        >
          <CarouselContent>
            {cardData?.["钣金"]?.map((item: any, index: number) => (
              <CarouselItem
                key={item.work_center_name}
                className="basis-1/3 flex justify-center pt-8 pb-16"
              >
                <MagicCard className="w-[24vw] h-[33vh]">
                  <div className="w-full h-full text-center">
                    <div className="text-4xl mt-4 text-slate-300">
                      {cardData?.["钣金"]?.[index]?.work_center_name}
                    </div>
                    <div className="relative flex justify-center mt-8">
                      <WavePercent
                        percent={cardData?.["钣金"]?.[index]?.percent}
                      ></WavePercent>
                    </div>
                    <div className="text-2xl flex w-full px-6 justify-between absolute bottom-4">
                      <span className=" text-slate-300">
                        已生产工单数：
                        <span className="text-green-300">
                          {cardData?.["钣金"]?.[index]?.completed}
                        </span>
                      </span>
                      <span className="text-slate-300">
                        已排产工单数：
                        <span className="text-red-300">
                          {cardData?.["钣金"]?.[index]?.qutstanding}
                        </span>
                      </span>
                    </div>
                  </div>
                </MagicCard>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex justify-center">
          <div className="w-[91vw]">
            <MagicCard className="h-[54vh] before:w-[101%] before:h-[103%]">
              <div className="text-4xl font-medium text-slate-300 text-center mt-6 w-full">
                【钣金】类型工站近一个月生产趋势图
              </div>

              <AreaBarChart data={chartData["钣金"]} />
            </MagicCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default BanJinPage;
