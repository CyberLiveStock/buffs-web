import React from "react";
import { Popover, PopoverTrigger, PopoverContent, Button, Card, CardBody } from "@nextui-org/react";
import '@fortawesome/fontawesome-free/css/all.min.css';

const InfoGraf = ({ infoText }) => {

    return (
        <div>
            <Popover placement="start-right" >
                <PopoverTrigger>
                    <span><i class="fa-solid fa-circle-info"></i></span>
                </PopoverTrigger>
                <PopoverContent>
                    <Card style={{ backgroundColor: "#f9f9f9", borderRadius: "8px", padding: "2px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                        <CardBody>
                            <p style={{ fontSize: "14px", color: "#333", lineHeight: "0.3" }}>
                                {infoText}
                            </p>
                        </CardBody>
                    </Card>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default InfoGraf;