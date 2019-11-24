<?php

namespace App\Controller;

use App\Entity\Video;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


/**
 * Class VideoController
 * @package App\Controller
 *
 * @Route("/api")
 */
class VideoController extends AbstractController
{
    /**
     * @Route("/getallvideos")
     */
    public function index()
    {
        $em = $this->getDoctrine()->getManager();
        $allvideos = $em->getRepository(Video::class)->findBy([],["id"=>"desc"]);
        $myarray = array();
        foreach($allvideos as $video){
            array_push($myarray,$video->toArray());
        }
        return $this->json([
            "response" => $myarray
        ]);
    }

    /**
     * @Route("/addonevideo")
     */
    public function addOneVideo(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $data=json_decode($request->getContent(),true);
        $title = $data["title"];
        $link = $data["link"];
        $plot = $data["plot"];

        $video = new Video();
        $video->setTitle($title);
        $video->setLink($link);
        $video->setPlot($plot);
        $video->setCreated(new \DateTime());
        $em->persist($video);
        $em->flush();

        $allvideos = $em->getRepository(Video::class)->findBy([],["id"=>"desc"]);
        $myarray = array();
        foreach($allvideos as $video){
            array_push($myarray,$video->toArray());
        }
        return $this->json([
            "response"=>"done",
            "data"=>$myarray
        ]);
    }

    /**
     * @Route("/deleteonevideo")
     */
    public function deleteOneVideo(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $data = json_decode($request->getContent(), true);
        $id = $data["id"];
        $video = $em->find(Video::class,$id);
        $em->remove($video);
        $em->flush();

        return $this->json(["response"=>"done"]);
    }

    /**
     * @Route("/editonevideo")
     */
    public function editOneVideo(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $data = json_decode($request->getContent(), true);
        $video = $em->find(Video::class,$data["id"]);
        $video->setTitle($data["title"]);
        $video->setLink($data["link"]);
        $video->setPlot($data["plot"]);
        $em->persist($video);
        $em->flush();

        return $this->json(["response"=>"done"]);
    }
}
