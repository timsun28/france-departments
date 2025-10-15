"use client";

import { useState } from "react";

export default function Home() {
    const [departments, setDepartments] = useState("");
    const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1];
    return (
        <div className="flex flex-col items-center justify-center min-h-svh">
            <div className="grid grid-cols-3 gap-4">
                {numbers.map((number) => (
                    <div
                        key={number}
                        className="bg-white text-black rounded-lg p-4"
                        onClick={() => {
                            setDepartments(departments + number.toString());
                        }}
                    >
                        {number}
                    </div>
                ))}
                <div className=""></div>
                <div
                    className="bg-white text-black rounded-lg p-4"
                    onClick={() => {
                        setDepartments(departments + "0");
                    }}
                >
                    0
                </div>
            </div>
        </div>
    );
}
