<?php

namespace App\Controller;

use App\Entity\Image;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class ImageController
 * @package App\Controller
 *
 * @Route("/api")
 */
class ImageController extends AbstractController
{
    /**
     * @Route("/getallimages")
     */
    public function index()
    {
        $em = $this->getDoctrine()->getManager();

        $allimages = $em->getRepository(Image::class)->findBy([],["id"=>"desc"]);
        $myarray = array();
        foreach ($allimages as $image)array_push($myarray,$image->toArray());
        return $this->json([
            "response" => "done",
            "data" => $myarray
        ]);
    }

    /**
     * @Route("/addoneimage")
     */
    public function addOneImage(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $file = $request->files->get("Image");
        $image = new Image();
        $image->setCreated(new \DateTime());
        if(isset($file)){
            $newfile = uniqid().".".$file->guessExtension();
            $file->move($this->getParameter("upload_dir")."imageimages/",$newfile);
            $image->setName($newfile);
        }
        $em->persist($image);
        $em->flush();

        $myimage = $em->getRepository(Image::class)->findOneBy(["name"=>$image->getName()])->toArray();
        return $this->json([
            "response" => "done",
            "data"=>$myimage
        ]);
    }

    /**
     * @Route("/deleteoneimage")
     */
    public function deleteOneImage(Request $request){
        $em = $this->getDoctrine()->getManager();

        $data=json_decode($request->getContent(),true);
        $image = $em->find(Image::class,$data["id"]);
        if($image->getName() != null){
            unlink($this->getParameter("upload_dir")."imageimages/".$image->getName());
        }
        $em->remove($image);
        $em->flush();
        return $this->json([
            "response" => "done"
        ]);
    }
}
