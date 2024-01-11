import { Button } from "@/components/button/Button";
import {
  InboxArrowDownIcon,
  InformationCircleIcon,
  ScaleIcon,
  WrenchScrewdriverIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";

export default function Home() {
  return (
    <div className=" h-screen  flex justify-center items-center text-center">
      <div>
        <div className="text-9xl font-bold">同日 MES 看板</div>
        <div className="mt-32">
          <Link href="/ji-jia-gong">
            <Button size="lg" className="mx-3">
              <WrenchScrewdriverIcon className="w-6 h-6 mr-4" />
              机加类型看板
            </Button>
          </Link>

          <Link href="/ban-jin">
            <Button size="lg" className="mx-3">
              <ScaleIcon className="w-6 h-6 mr-4" />
              钣金类型看板
            </Button>
          </Link>

          <Link href="/zhuang-pei">
            <Button size="lg" className="mx-3">
              <InboxArrowDownIcon className="w-6 h-6 mr-4" />
              装配类型看板
            </Button>
          </Link>

          <Link href="/qi-ta">
            <Button size="lg" className="mx-3">
              <InformationCircleIcon className="w-6 h-6 mr-4" />
              其他类型看板
            </Button>
          </Link>

          <Link href="/zhi-jian">
            <Button size="lg" className="mx-3">
              <DocumentCheckIcon className="w-6 h-6 mr-4" />
              质检类型看板
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
