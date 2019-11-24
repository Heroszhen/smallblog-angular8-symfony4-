<?php

namespace App\Controller;

use App\Entity\Subject;
use App\Entity\Subjecttext;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


/**
 * Class SubjectController
 * @package App\Controller
 *
 * @Route("/api")
 */
class SubjectController extends AbstractController
{
    /**
     * @Route("/getallsubjects")
     */
    public function index()
    {
        $em = $this->getDoctrine()->getManager();
        $allsubjects = $em->getRepository(Subject::class)->findBy([],["id"=>"desc"]);
        $myarray = array();
        foreach ($allsubjects as $obj)array_push($myarray,$obj->toArray());
        return $this->json([
            "response"=>"done",
            "data"=>$myarray
        ]);
    }

    /**
     * @Route("/getonesubject")
     */
    public function getOneSubject(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $data=json_decode($request->getContent(),true);

        $subject = $em->find(Subject::class,$data["subjectid"]);
        $myarray = $subject->toArray();
        return $this->json([
            "response"=>"done",
            "data"=>$myarray
        ]);
    }

    /**
     * @Route("/getsubjecttexts")
     */
    public function getSubjecttexts(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $data=json_decode($request->getContent(),true);

        $subject = $em->find(Subject::class,$data["subjectid"]);
        $alltexts = $em->getRepository(Subjecttext::class)->findBy(["subject"=>$subject],["id"=>"desc"]);
        $myarray = array();
        foreach ($alltexts as $text)array_push($myarray,$text->toArray());
        return $this->json([
            "response"=>"done",
            "data"=>$myarray
        ]);
    }
}
