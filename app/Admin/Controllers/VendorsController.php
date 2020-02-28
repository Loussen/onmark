<?php

namespace App\Admin\Controllers;

use App\Http\Controllers\Controller;

class VendorsController extends Controller
{

    public function index()
    {
        $xmlUrl = file_get_contents('file:///C:/Users/Fuad/Desktop/onmark/1.xml');

        $xml = simplexml_load_string($xmlUrl);

        $json = json_encode($xml);

        $array = json_decode($json,TRUE);

//        var_dump($array['Product'][0]);

        foreach ($array['Product'] as $product)
        {
            echo "<b>ProductId:</b> ".$product['@attributes']['Id']."<br />";
            echo "<b>ModelCode:</b> ".$product['@attributes']['ModelCode']."<br />";

            foreach ($product['Categories'] as $category)
            {
                $i = 1;
                echo "<b>Categories:</b> <br />";
                foreach ($category as $value)
                {
                    if($value['@attributes']['Path'])
                    {
                        echo $i.". ".$value['@attributes']['Path']."<br />";

                        $i++;
                    }
                }
            }
            echo " --------------------------- "."<br />";
        }
    }

}
