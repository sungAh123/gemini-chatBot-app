import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  ScrollView, // ScrollView만 사용
} from "react-native";

export default function Chatbot() {
  const [prompt, setPrompt] = useState("");
  const [responseText, setResponseText] =
    useState("AI 응답이 여기에 표시됩니다.");

  // 서버 주소
  const serverUrl = "http://172.19.103.145/index.php";
  const handleSend = async () => {
    if (!prompt.trim()) {
      setResponseText("질문을 먼저 입력해주세요.");
      return;
    }
    setResponseText("AI가 생각 중...");

    try {
      const response = await fetch(serverUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Http 오류 발생. 상태코드: ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
    } catch (error) {
      Alert.alert(
        "오류 발생",
        `API 호출 실패: ${error.message}. 서버 상태를 확인하세요.`
      );
      setResponseText("API 호출에 실패했습니다.");
    }
  };
}
