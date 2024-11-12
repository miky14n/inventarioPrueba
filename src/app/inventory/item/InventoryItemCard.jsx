"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody, Image, Button, Badge } from "@nextui-org/react";
import { HeartIcon } from "./HeartIcon";
import Link from "next/link";

const InventoryItemCard = ({ item }) => {
  const [liked, setLiked] = useState(false);
  const [itemData, setItemData] = useState(item);

  // Update `itemData` whenever `item` prop changes
  useEffect(() => {
    console.log(item);
    setItemData(item);
  }, [item]);

  if (!itemData) return null;

  const {
    numserial,
    categoryname,
    mark,
    model,
    image,
    bar_code,
    imei,
    numberport,
  } = itemData;

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 w-full max-w-[800px] shadow-lg m-6 p-6"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 gap-6 items-start">
          {/* Image Section */}
          <div className="col-span-6 md:col-span-3">
            <Image
              alt={`${categoryname} - ${mark}`}
              className="object-cover rounded-lg shadow-md w-full h-64"
              src={image}
            />
          </div>

          {/* Details Section */}
          <div className="col-span-6 md:col-span-3 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-semibold text-foreground/90">
                  {categoryname}
                </h3>
                <p className="text-md text-gray-500">
                  {model} • {mark}
                </p>
              </div>
              <Button
                isIconOnly
                className="text-default-900/60 hover:bg-foreground/10"
                radius="full"
                variant="light"
                onPress={() => setLiked(!liked)}
              >
                <HeartIcon
                  className={liked ? "[&>path]:stroke-transparent" : ""}
                  fill={liked ? "currentColor" : "none"}
                />
              </Button>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              <Badge color="primary" variant="flat">
                {categoryname}
              </Badge>
            </div>

            {/* Information Section */}
            <div className="text-md text-gray-800 space-y-2">
              <p>
                <strong>Serial Number:</strong> {numserial}
              </p>
              <p>
                <strong>IMEI:</strong> {imei}
              </p>
              <p>
                <strong>Barcode:</strong> {bar_code}
              </p>
              <p>
                <strong>Number Port:</strong> {numberport}
              </p>
              <p>
                <strong>Brand:</strong> {mark}
              </p>
              <p>
                <strong>Model:</strong> {model}
              </p>
              <p>
                <strong>Category:</strong> {categoryname}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Link href="/inventory">
            <Button color="primary">
              Volver
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default InventoryItemCard;
