<?php

namespace App\Controller;


use App\Entity\Article;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class ArticleController
 * @package App\Controller
 *
 * @Route("/api")
 */
class ArticleController extends AbstractController
{
    /**
     * @Route("/getonearticle")
     */
    public function index(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $data=json_decode($request->getContent(),true);
        $id = $data["articleid"];
        $article = $em->find(Article::class,$id);

        return $this->json([
            "response" => $article->toArray()
        ]);
    }

    /**
     * @Route("/getallarticles")
     */
    public function getAllArticles(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $allarticles = $em->getRepository(Article::class)->findBy([],['id'=>'DESC']);

        $allarticles2 = array();
        foreach($allarticles as $onearticle)array_push($allarticles2,$onearticle->toArray());
        return $this->json([
            "response" => $allarticles2
        ]);
    }

    /**
     * @Route("/addonearticle")
     */
    public function addOneArticle(Request $request){
        $em = $this->getDoctrine()->getManager();

        $file = $request->files->get("photo");
        $title = $request->request->get("title");
        $content = $request->request->get("content");

        $article = new Article();
        $user = $em->find(User::class,1);
        $article->setUser($user);
        if(isset($title))$article->setTitle($title);
        if(isset($content))$article->setContent($content);
        if(isset($file)){
            $newfile = uniqid().".".$file->guessExtension();
            $file->move($this->getParameter("upload_dir")."articleimages/",$newfile);
            $article->setPhoto($newfile);
        }
        $time = new \DateTime();
        $time = $time->format("d-m-Y");
        $article->setCreated($time);
        $em->persist($article);
        $em->flush();

        return $this->json([
            "response" => "done"
        ]);
    }

    /**
     * @Route("/deleteonearticle")
     */
    public function deleteOneArticle(Request $request){
        $em = $this->getDoctrine()->getManager();

        $data=json_decode($request->getContent(),true);
        $article = $em->find(Article::class,$data["id"]);
        if($article->getPhoto() != null){
            unlink($this->getParameter("upload_dir")."articleimages/".$article->getPhoto());
        }
        $em->remove($article);
        $em->flush();
        return $this->json([
            "response" => "done"
        ]);
    }

    /**
     * @Route("/editonearticle")
     */
    public function editOneArticle(Request $request){
        $em = $this->getDoctrine()->getManager();

        $file = $request->files->get("photo");
        $id = $request->request->get("id");
        $title = $request->request->get("title");
        $content = $request->request->get("content");

        $article = $em->find(Article::class,$id);
        $oldphoto = $article->getPhoto();
        if(isset($title))$article->setTitle($title);
        if(isset($content))$article->setContent($content);
        if(isset($file)){
            $newfile = uniqid().".".$file->guessExtension();
            $file->move($this->getParameter("upload_dir")."articleimages/",$newfile);
            $article->setPhoto($newfile);
            if($oldphoto != null)unlink($this->getParameter("upload_dir")."articleimages/".$oldphoto);
        }
        $em->persist($article);
        $em->flush();

        $allarticles = $em->getRepository(Article::class)->findBy([],['id'=>'DESC']);

        $allarticles2 = array();
        foreach($allarticles as $onearticle)array_push($allarticles2,$onearticle->toArray());

        return $this->json([
            "response" => "done",
            "data" => $allarticles2
        ]);
    }

    /**
     * @Route("/getmesarticles")
     */
    public function getMesArticles(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $data=json_decode($request->getContent(),true);
        $user = $em->getRepository(User::class)->findOneBy(["email"=>$data["email"]]);
        $allarticles = $em->getRepository(Article::class)->findBy(["user"=>$user],['id'=>'DESC']);
        $allarticles2 = array();
        foreach($allarticles as $onearticle)array_push($allarticles2,$onearticle->toArray());
        return $this->json([
            "response" => $allarticles2
        ]);
    }
}
