<?php

namespace App\Controller;

use App\Entity\Profile;
use App\Entity\Usefullink;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class UserController
 * @package App\Controller
 *
 * @Route("/api")
 */
class UserController extends AbstractController
{
    /**
     * @Route("/connection")
     */
    public function index(Request $request)
    {
        $data=json_decode($request->getContent(),true);
        $user = $this->getDoctrine()->getRepository(User::class)->findOneBy(["email"=>$data["email"],"password"=>md5($data["password"]."heroszhen")]);
        if($user == null){
            $msgalert = "Compte non trouvé";
            $infos = array();
        }else{
            $msgalert = "done";
            $infos = $user->toArray();
        }
        return $this->json([
            "response" => $msgalert,
            "user" => $infos
        ]);
    }

    /**
     * @Route("/registration")
     */
    public function registration(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $data=json_decode($request->getContent(),true);

        $user = $em->getRepository(User::class)->findOneBy(["email"=>$data["email"]]);
        if($user != null) $msgalert = "Compte existant";
        else{
            $theuser = new User();
            $theuser->setEmail($data["email"]);
            $theuser->setPassword(md5($data["password"]."heroszhen"));
            $theuser->setRegistration(new \DateTime());
            $em->persist($theuser);
            $em->flush();

            $profile = new Profile();
            $profile->setUser($theuser);
            $em->persist($profile);
            $em->flush();

            $msgalert = "done";
        }
        return $this->json([
            "response" => $msgalert,
        ]);
    }

    /**
     * @Route("/getuserfullinks")
     */
    public function getUsefullinks(){
        $em = $this->getDoctrine()->getManager();

        $alllinks = $em->getRepository(Usefullink::class)->findAll();
        $alllinks2 = array();
        foreach ($alllinks as $link)array_push($alllinks2,$link->toArray());

        return $this->json([
            "response" => $alllinks2,
        ]);
    }
}
