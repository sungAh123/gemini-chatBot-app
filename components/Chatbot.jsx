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
}
