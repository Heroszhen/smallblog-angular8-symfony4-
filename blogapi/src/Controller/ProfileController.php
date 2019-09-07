<?php

namespace App\Controller;

use App\Entity\Profile;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class ProfileController
 * @package App\Controller
 *
 * @Route("/api")
 */
class ProfileController extends AbstractController
{
    /**
     * @Route("/getprofile")
     */
    public function index(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $data=json_decode($request->getContent(),true);
        $user = $em->getRepository(User::class)->findOneBy(["email"=>$data["email"]]);
        $profile = $em->getRepository(Profile::class)->findOneBy(["user"=>$user]);
        return $this->json([
            "response"=>$profile->toArray()
        ]);
    }

    /**
     * @Route("/updateprofile")
     */
    public function updateProfile(Request $request){
        $em = $this->getDoctrine()->getManager();

        //$data=json_decode($request->getContent(),true);
        $file = $request->files->get("photo");
        $id = $request->request->get("id");
        $name = $request->request->get("name");
        //guessExtension()
        //getClientOriginalName()
        $newfile = uniqid().".".$file->guessExtension();
        $file->move($this->getParameter("upload_dir")."profileimages/",$newfile);

        $user = $em->find(User::class,$id);
        $profile = $em->getRepository(Profile::class)->findOneBy(["user"=>$user]);
        $oldphoto = $profile->getPhoto();
        if($oldphoto != null)unlink($this->getParameter("upload_dir")."profileimages/".$oldphoto);
        $profile->setPhoto($newfile);
        $profile->setName($name);
        $em->persist($profile);
        $em->flush();

        return $this->json([
            "response" =>"Vos modifications ont été enregistrées avec succès"
        ]);
    }
}
