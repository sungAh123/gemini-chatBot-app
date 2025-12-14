<?php
    // JSON 응답 & CORS 허용
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");

    // 환경변수에서 API 키 읽기
    $api_key = getenv('GEMINI_API_KEY');

    // 요청 본문(JSON) 읽기
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);
    $prompt = $data['prompt'] ?? '';

    if(!$api_key) {
        http_response_code(500);
        echo json_encode(["error" => "Gemini API key not set"]);
        exit;
    }

    if(!$prompt) {
        http_response_code(400);
        echo json_encode(["error" => "No prompt provided"]);
        exit;
    }

    // Gemini API 요청
    $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$api_key}";

    $body = [
        "contents" => [
            [
                "parts" => [
                    ["text" => $prompt]
                ]
            ]
        ]
    ];

    // POST 요청 옵션
    $options = [
        "http" => [
            "method" => "POST",
            "header" => "Content-Type: application/json\r\n",
            "content" => json_encode($body),
            "ignore_errors" => true
        ]
    ];

    // 요청 전송
    $context = stream_context_create($options);
    $response = @file_get_contents($url, false, $context);

    if($response === false) {
        http_response_code(500);
        echo json_encode(["Failed to connect Gemini API"]);
        exit;
    }

    // API 응답 그대로 반환
    echo $response;
?>