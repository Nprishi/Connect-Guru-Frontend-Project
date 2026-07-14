"use client";

import { motion } from "framer-motion";
import {
  ChevronRight,
  Clock3,
  TrendingUp,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";


interface OverviewItem {
  title: string;
  description: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}


interface OverviewCardProps {

  title: string;

  description: string;

  actionLabel: string;

  items: OverviewItem[];

  todaySessions: number;

  onAction?: () => void;

}



export function OverviewCard({
  title,
  description,
  actionLabel,
  items,
  todaySessions,
  onAction,
}: OverviewCardProps) {


  return (

    <Card
      className="
        overflow-hidden
        rounded-3xl
        border-slate-200
        bg-white
        shadow-sm
      "
    >


      {/* HEADER */}

      <CardHeader
        className="
          p-6
        "
      >

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >

          <div>

            <CardTitle
              className="
                text-xl
                font-semibold
                text-slate-900
              "
            >
              {title}
            </CardTitle>


            <CardDescription
              className="
                mt-1
              "
            >
              {description}
            </CardDescription>

          </div>


          <div
            className="
              rounded-2xl
              bg-indigo-50
              p-3
            "
          >

            <TrendingUp
              className="
                h-5
                w-5
                text-indigo-600
              "
            />

          </div>


        </div>


      </CardHeader>





      <CardContent
        className="
          space-y-5
          p-6
          pt-0
        "
      >



        {/* OVERVIEW ITEMS */}


        <div
          className="
            grid
            gap-4
            sm:grid-cols-2
          "
        >

          {
            items.map((item) => {


              const Icon = item.icon;


              return (

                <motion.div

                  key={item.title}

                  whileHover={{
                    y: -4,
                  }}

                  transition={{
                    duration: 0.2,
                  }}

                  className="
                    rounded-3xl
                    border
                    border-slate-100
                    bg-slate-50/70
                    p-5
                    transition
                  "

                >


                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >


                    <div
                      className={`
                        grid
                        h-11
                        w-11
                        place-items-center
                        rounded-2xl
                        ${item.color}
                      `}
                    >

                      <Icon
                        className="
                          h-5
                          w-5
                        "
                      />

                    </div>


                    <span
                      className="
                        text-2xl
                        font-bold
                        text-slate-900
                      "
                    >
                      {item.value}
                    </span>


                  </div>




                  <h4
                    className="
                      mt-4
                      text-sm
                      font-semibold
                      text-slate-900
                    "
                  >
                    {item.title}
                  </h4>



                  <p
                    className="
                      mt-1
                      text-xs
                      leading-relaxed
                      text-slate-500
                    "
                  >
                    {item.description}
                  </p>


                </motion.div>


              );


            })
          }


        </div>





        {/* TODAY SESSION CARD */}


        <div
          className="
            rounded-3xl
            bg-gradient-to-br
            from-indigo-600
            to-violet-600
            p-6
            text-white
          "
        >


          <div
            className="
              flex
              items-center
              gap-2
              text-sm
              text-indigo-100
            "
          >

            <Clock3
              className="
                h-4
                w-4
              "
            />

            Today Sessions

          </div>



          <div
            className="
              mt-3
              text-4xl
              font-bold
            "
          >

            {todaySessions}

          </div>



          <p
            className="
              mt-2
              text-sm
              text-indigo-100
            "
          >

            Keep your schedule organized and deliver quality lessons.

          </p>




          <Button

            onClick={onAction}

            className="
              mt-5
              w-full
              rounded-xl
              bg-white
              text-indigo-700
              hover:bg-indigo-50
            "

          >

            {actionLabel}


            <ChevronRight
              className="
                ml-2
                h-4
                w-4
              "
            />

          </Button>


        </div>


      </CardContent>


    </Card>

  );
}