<?php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\Comment;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class CommentController
 * @package App\Controller
 *
 * @Route("/api")
 */
class CommentController extends AbstractController
{
    /**
     * @Route("/addonecomment")
     */
    public function index(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $data=json_decode($request->getContent(),true);
        $comment = new Comment();
        $time = new \DateTime();
        $comment->setCreated($time->format("d-m-Y"));
        $comment->setContent($data["content"]);
        $user = $em->find(User::class,$data["userid"]);
        $comment->setUser($user);
        $article = $em->find(Article::class,$data["articleid"]);
        $comment->setArticle($article);

        $em->persist($comment);
        $em->flush();

        $allcomments = $em->getRepository(Comment::class)->findBy(["article"=>$article],["id"=>"desc"]);
        $myarray = array();
        foreach ($allcomments as $comment){
            array_push($myarray,$comment->toArray());
        }
        return $this->json([
            "response"=>"done",
            "data"=>$myarray
        ]);
    }

    /**
     * @Route("/getallcomments")
     */
    public function getAllComments(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $data=json_decode($request->getContent(),true);

        $article = $em->find(Article::class,$data["articleid"]);
        $allcomments = $em->getRepository(Comment::class)->findBy(["article"=>$article],["id"=>"desc"]);
        $myarray = array();
        foreach ($allcomments as $comment){
            array_push($myarray,$comment->toArray());
        }
        return $this->json([
            "response"=>"done",
            "data"=>$myarray
        ]);
    }

    /**
     * @Route("/deleteonecomment")
     */
    public function deleteOneArticle(Request $request){
        $em = $this->getDoctrine()->getManager();

        $data=json_decode($request->getContent(),true);
        $comment = $em->find(Comment::class,$data["id"]);
        $em->remove($comment);
        $em->flush();
        return $this->json([
            "response" => "done"
        ]);
    }

}
