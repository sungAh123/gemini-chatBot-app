import React, { useState } from "react";
import { API_URL } from "@env";

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
  const serverUrl = `${API_URL}/index.php`;
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
      setResponseText(text);
    } catch (error) {
      Alert.alert(
        "오류 발생",
        `API 호출 실패: ${error.message}. 서버 상태를 확인하세요.`
      );
      setResponseText("API 호출에 실패했습니다.");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent} // 콘텐츠 정렬 설정
    >
      {/* 흰색 카드 영역 */}
      <View style={styles.card}>
        <Text style={styles.title}>Gemini AI Prompt</Text>

        {/* 입력창 */}
        <TextInput
          style={styles.input}
          placeholder="AI에게 질문을 입력하세요..."
          multiline={true}
          textAlignVertical="top"
          value={prompt}
          onChangeText={setPrompt}
        />

        {/* button */}
        <Button title="send" onPress={handleSend} color="#4A69FF" />
      </View>

      {/* 응답 표시 영역 */}
      <View style={styles.responseArea}>
        <Text style={styles.responseText}>{responseText}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  // ScrollView 내부 콘텐츠 스타일 (중앙 정렬 및 패딩)
  scrollContent: {
    flexGrow: 1, // 콘텐츠가 화면 높이보다 작을 때도 중앙 정렬
    justifyContent: "center", // 세로 중앙 정렬
    alignItems: "center", // 가로 중앙 정렬
    paddingVertical: 40, // 상하 패딩 추가
  },
  card: {
    width: "90%",
    maxWidth: 500,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
    marginBottom: 20, // 응답 영역과의 간격
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    minHeight: 120,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    paddingTop: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  responseArea: {
    width: "90%",
    maxWidth: 500,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderColor: "#4A69FF",
    borderWidth: 1,
  },
  responseText: {
    fontSize: 14,
    color: "#34495e",
    lineHeight: 20,
  },
});
