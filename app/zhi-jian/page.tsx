"use client";
import { MagicCard } from "@/components/card/MagicCard";
import { WavePercent } from "@/components/percent/WavePercent";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/carousel/Carousel";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table/Table";
import Autoplay from "embla-carousel-autoplay";

const ZhiJianPage = () => {
  const [cardData, setCardData] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);

  const fetchCardData = async () => {
    const res = await fetch(
      "http://10.0.20.61:8068/Board/M106GetQatasknumber",
      {
        method: "GET",
      }
    );

    if (!res) return;

    const { data } = await res.json();

    if (!data) return;

    const result = data.map((item: any) => {
      return {
        ...item,
        percent:
          item.qualified_quantity === 0 && item.total_quantity === 0
            ? 0
            : Math.round((item.qualified_quantity / item.total_quantity) * 100),
      };
    });

    setCardData(result);
  };

  const fetchTableData = async () => {
    const queryParmas = new URLSearchParams({
      startdate: "2023-01-01",
    }).toString();
    const res = await fetch(
      `http://10.0.20.61:8068/Board/M107Getdispatch_order?${queryParmas}`,
      {
        method: "GET",
      }
    );

    if (!res) return;

    const { data } = await res.json();

    if (!data) return;

    setTableData(data);
  };

  useEffect(() => {
    fetchCardData();
    fetchTableData();

    const interval = setInterval(() => {
      fetchCardData();
      fetchTableData();
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="w-full h-full">
        <Carousel
          plugins={[
            Autoplay({
              delay: 10000,
            }),
          ]}
        >
          <CarouselContent>
            {cardData.map((item: any, index: number) => (
              <CarouselItem
                key={item.procedure_id}
                className="basis-1/3 flex justify-center pt-8 pb-16"
              >
                <MagicCard className="w-[24vw] h-[33vh]">
                  <div className="w-full h-full text-center">
                    <div className="text-4xl mt-4 text-slate-300">
                      {item.procedure_name}
                    </div>
                    <div className="relative flex justify-center mt-8">
                      <WavePercent percent={item.percent}></WavePercent>
                    </div>
                    <div className="text-2xl flex w-full px-6 justify-between absolute bottom-4">
                      <span className=" text-slate-300">
                        质检总数量：
                        <span className="text-green-300">
                          {item.total_quantity}
                        </span>
                      </span>
                      <span className="text-slate-300">
                        质检通过数：
                        <span className="text-red-300">
                          {item.qualified_quantity}
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
              <div className="w-full h-full overflow-auto">
                <div className="text-4xl font-medium text-slate-300 text-center mt-6 my-8 w-full">
                  未通过质检的派工单
                </div>
                <Table className="text-center text-slate-400 text-lg overflow-auto">
                  <TableHeader className="text-center">
                    <TableRow>
                      <TableHead className="text-center">工单明细号</TableHead>
                      <TableHead className="text-center">工序编号</TableHead>
                      <TableHead className="text-center">物料编号</TableHead>
                      <TableHead className="text-center">物料名称</TableHead>
                      <TableHead className="text-center">计划生产数</TableHead>
                      <TableHead className="text-center">实际生产数</TableHead>
                      <TableHead className="text-center">
                        预计完成时间
                      </TableHead>
                      <TableHead className="text-center">状态</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.workorder_did}</TableCell>
                        <TableCell>{item.procedure_id}</TableCell>
                        <TableCell>{item.material_id}</TableCell>
                        <TableCell>{item.material_name}</TableCell>
                        <TableCell>{item.planned_quantity}</TableCell>
                        <TableCell>{item.reported_quantity}</TableCell>
                        <TableCell>{item.planned_completion_time}</TableCell>
                        <TableCell className="text-red-300">
                          {item.status}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </MagicCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default ZhiJianPage;
