// function to fetch data from the API
export async function fetchProfileData(
) {

    // when in debug mode, return mock data
    const profile = {
        name: "De-Sheng Chen",
        avatar: import.meta.env.VITE_PROFILE_IMAGE_URL,
        role: "A student studying CSIE at NTOU | Full-Stack Developer | Learning Cloud Development",
        location: "Taipei–Keelung Metropolitan area",
        connections: "97 followers · 93 connections",
        about: `Hello World! I am De-Sheng Chen.
        I graduated from the Department of Computer Science and Information Engineering at NYUST, and I am currently studying at the Institute of Computer Science and Information Engineering at NTOU.
        
        Specializing in full-stack development and mobile app development, I am also sprinting on the path of learning cloud technologies.`,
    
        experience: [
          {
            title: "Data Science Engineering Project Assistant",
            company: "National Yunlin University of Science and Technology",
            period: "Jan 2022 - Mar 2022 · 3 months",
            location: "Douliu City, Taiwan",
            description: [
              "Participated in the creation of training datasets for computer vision projects, ensuring data quality and completeness required for object detection models.",
              "Enhanced understanding of AI development pipelines by engaging in technical exchanges with the research team to learn about the Kubernetes (K8s) architecture and data processing workflows.",
            ],
            logo: "/api/placeholder/32/32",
          },
        ],
    
        education: [
          {
            school: "National Taiwan Ocean University",
            degree: "Master's Degree",
            field: "Department of Computer Science and Information Engineering",
            period: "2024 - 2026",
            logo: "/api/placeholder/32/32",
          },
          {
            school: "National Yunlin University of Science and Technology",
            degree: "Bachelor's Degree",
            field: "Department of Computer Science and Information Engineering",
            period: "2021 - 2024",
            logo: "/api/placeholder/32/32",
          },
          {
            school: "National Kaohsiung University of Science and Technology",
            degree: "Bachelor's Degree",
            field: "Department of Computer Science and Information Engineering",
            period: "2020 - 2021",
            logo: "/api/placeholder/32/32",
          },
        ],
    
        certifications: [
          {
            name: "Inspect Rich Documents with Gemini Multimodality and Multimodal RAG Skill Badge",
            issuer: "Google Cloud Skills Boost",
            issued: "Nov 2024",
            logo: "/api/placeholder/32/32",
            link: "https://www.credly.com/badges/df90c728-18be-4aad-bb51-11f067cfe82d/public_url",
          },
          {
            name: "Develop GenAI Apps with Gemini and Streamlit Skill Badge",
            issuer: "Google Cloud Skills Boost",
            issued: "Oct 2024",
            link: "https://www.credly.com/badges/d3bfc846-6191-4902-8941-f664597f58fe",
            logo: "/api/placeholder/32/32",
          },
          {
            name: "Foundational C# with Microsoft",
            issuer: "freeCodeCamp",
            issued: "Oct 2024",
            credentialId: "doeshing-fcswm",
            link: "https://freecodecamp.org/certification/doeshing/foundational-c-sharp-with-microsoft",
            logo: "/api/placeholder/32/32",
          },
          {
            name: "LinkedIn Premium 活用術",
            issuer: "LinkedIn",
            issued: "Oct 2024",
            link: "https://www.linkedin.com/learning/certificates/84b810e1849d3907dc77e2d0f8d85bc27f766e7bd6026778e07bb9bf45b48731",
            logo: "/api/placeholder/32/32",
          },
          {
            name: "Prompt Design in Vertex AI Skill Badge",
            issuer: "Google Cloud Skills Boost",
            issued: "Oct 2024",
            link: "https://www.credly.com/badges/606f597d-17e3-4d35-a3c4-50230577d7d7/public_url",
            logo: "/api/placeholder/32/32",
          },
          {
            name: "学生のためのLinkedIn 入門",
            issuer: "LinkedIn",
            issued: "Oct 2024",
            link: "https://www.linkedin.com/learning/certificates/3e2bab6d33111699b2b338c637ea3c88971784cb13c13848e0f8bdd81c3ba556",
            logo: "/api/placeholder/32/32",
          },
          {
            name: "[計畫辦公室] AI CUP 2022: 農地作物現況調查影像辨識競賽-秋季賽",
            issuer: "教育部人工智慧競賽與標註資料蒐集計畫 (AI CUP)",
            issued: "Mar 2023",
            link: "https://global.turingcerts.com/co/cert?hash=d0b3d85c8737de9b9a0bcf97362e5ae7c2f5575bbd441465132cf25a1ae5f446",
            logo: "/api/placeholder/32/32",
          },
          {
            name: "MTA: Networking Fundamentals",
            issuer: "微軟公司",
            issued: "Dec 2018",
            link: "https://www.credly.com/badges/a8179a0b-31f6-48c5-9dc1-35ba62f111e6/public_url",
            logo: "/api/placeholder/32/32",
          },
          {
            name: "丙級電腦軟體應用技術士",
            issuer: "中華民國勞動部",
            issued: "Oct 2017",
            credentialId: "118-810409",
            logo: "/api/placeholder/32/32",
          },
        ],
    
        volunteer: [
          {
            role: "活動志工",
            organization: "油廠社區生態保存協會",
            period: "2022",
            description: [],
          },
          {
            role: "2022 Maker 工作坊 課程助教",
            organization: "國立雲林科技大學",
            period: "2022",
            description: [
              "Created instructional content for integrating AIoT functionalities with ESP32, boosting participant knowledge and competence.",
              "Coordinated the setup and integration of ESP32 boards for AIoT smart home projects, leveraging Python to boost project efficiency and participant interaction.",
              "Conducted detailed diagnostics and solution walkthroughs, minimizing common implementation errors in workshop IoT projects.",
            ],
          },
        ],
    
        projects: [
          {
            name: "基於LoRaWAN 技術之電器管理系統",
            period: "Jul 2023 - Nov 2023",
            description:
              "本系統透過LoRaWAN技術，針對大範圍的電器進行遠端控制與監控，包括電力消耗及健康狀況分析。我們的專案目標是讓管理者能自動監控多設備的開關狀態及使用情形，並透過資料庫及WebSocket傳輸實現即時管理。與WiFi相比，LoRaWAN傳輸距離更長、能耗更低，適用於大範圍的應用場景。本系統具備電器健康分析、前端操作等功能，讓使用者能輕鬆管理電器並進行維護。",
            descriptionJa:
              "このシステムは、LoRaWAN技術を活用して、広範囲にわたる電気機器を遠隔で制御・監視することが可能です。また、電力消費や健康状態の分析も行います。私たちのプロジェクトの目標は、管理者が多数のデバイスのオン・オフの状態や使用状況を自動的に監視し、データベースとWebSocketを利用してリアルタイムで管理できる環境を提供することです。WiFiと比較して、LoRaWANは通信距離が長く、エネルギー消費が少ないため、広範囲での利用に非常に適しています。このシステムは、電気機器の健康分析機能やフロントエンドでの操作機能を備えており、ユーザーが電気機器を簡単に管理し、メンテナンスを行うことができます。",
            descriptionEn:
              "Our system uses LoRaWAN technology to remotely control and monitor electrical appliances over large areas, including analyzing power consumption and health status. Our project aims to enable managers to automatically monitor the on/off status and usage of multiple devices, achieving real-time management through databases and WebSocket transmission. Compared to WiFi, LoRaWAN offers longer transmission distances and lower energy consumption, making it suitable for wide-area applications. The system features appliance health analysis and a user-friendly interface, allowing users to easily manage and maintain their devices.",
            collaborators: ["田以諾"],
            technologies: ["LoRaWAN", "WebSocket", "Database"],
          },
        ],
    
        scores: [
          {
            test: "TOEIC",
            score: "655",
            date: "Mar 2024",
            logo: "/api/placeholder/32/32",
          },
          {
            test: "Collegiate Programming Examination",
            score: "7.6%",
            date: "May 2022",
            logo: "/api/placeholder/32/32",
          },
        ],
    
        languages: [
          {
            name: "中国語",
            level: "Native or bilingual proficiency",
          },
          {
            name: "英語",
            level: "Limited working proficiency",
          },
          {
            name: "日本語",
            level: "Elementary proficiency",
          },
        ],
      };

    return profile;
}