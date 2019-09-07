<?php

namespace App\Repository;

use App\Entity\Usefullink;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Usefullink|null find($id, $lockMode = null, $lockVersion = null)
 * @method Usefullink|null findOneBy(array $criteria, array $orderBy = null)
 * @method Usefullink[]    findAll()
 * @method Usefullink[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UsefullinkRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Usefullink::class);
    }

    // /**
    //  * @return Usefullink[] Returns an array of Usefullink objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Usefullink
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
