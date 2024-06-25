
<?php
/*
  2. PHP
	2.1 What wrong with code below:
		$arr = [
			'a' => 'ABC',
			'b' => 'DEF',
			'c' => 'GHI',
			'd' => 'JKL',
			'e' => 'MNO',
		];
		
		$k = 'ab';
		if($arr[$k]) {
			var_dump(($arr[$k]);
		}
    Answer :
    Array Key Not Defined: In your original code, the key $k = 'ab'; does not exist in the array, so referencing $arr[$k] will cause an undefined index notice.
    Syntax Error: There is a missing closing parenthesis in the var_dump function.
    
 */
    $arr = [
        'a' => 'ABC',
        'b' => 'DEF',
        'c' => 'GHI',
        'd' => 'JKL',
        'e' => 'MNO',
    ];

    $k = 'ab';
    if (isset($arr[$k])) {    // origin if($arr[$k]){}
        var_dump($arr[$k]);   //            var_dump(($arr[$k])
    }
/*
	2.2 What wrong with code below:
		$arr = [
			'a' => 'ABC',
			'b' => 'DEF',
			'c' => 'GHI',
			'd' => 'JKL',
			'e' => 'MNO',
		];
		
		$valid = false;
		foreach($arr as $key => $val) {
			if($key == 'b' && $val = 'DEF') {
				$valid = true;
			}
		}
		
		echo ($valid) ? 'TRUE' : 'FALSE';
    Answer : 
        Use == for comparison to check if $val is equal to 'DEF' instead of using the assignment operator =, which would assign the value 'DEF' to $val.    
*/
        $valid = false;
        foreach($arr as $key => $val) {
            if($key == 'b' && $val == 'DEF') { // origin $val = 'DEF'
                $valid = true;
            }
        }

        echo ($valid) ? 'TRUE' : 'FALSE';
    /*
    2.3
		- Write a PHP function to detect webhook enpoint data (POST method, JSON response) and write data into collect.json
		- Write a PHP function how to caching BIG DATA
    */
    
    function handleWebhook() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $postData = file_get_contents('php://input');
            $data = json_decode($postData, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $filePath = 'collect.json';
                file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT));
                header('Content-Type: application/json');
                echo json_encode(['status' => 'success', 'message' => 'Data written to collect.json']);
            } else {
                header('Content-Type: application/json', true, 400);
                echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
            }
        } else {
            header('Content-Type: application/json', true, 405);
            echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
        }
    }
    // handleWebhook();


    function cacheBigData($cacheKey, $data, $cacheDir = 'cache/', $expiry = 3600) {
        if (!is_dir($cacheDir)) {
            mkdir($cacheDir, 0755, true);
        }
        $cacheFile = $cacheDir . md5($cacheKey) . '.cache';
        if (file_exists($cacheFile) && (filemtime($cacheFile) + $expiry > time())) {
            return file_get_contents($cacheFile);
        } else {
            file_put_contents($cacheFile, $data);
            return $data;   // return original data
        }
    }
    $dataToCache = json_encode(['large' => 'data set', 'example' => 'values']);  // Replace with actual big data
    $cacheKey = 'unique-key-for-big-data';  
    $cachedData = cacheBigData($cacheKey, $dataToCache);
    echo $cachedData;
?>