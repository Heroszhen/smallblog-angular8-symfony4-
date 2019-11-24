<?php

namespace App\Repository;

use App\Entity\Subjecttext;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Subjecttext|null find($id, $lockMode = null, $lockVersion = null)
 * @method Subjecttext|null findOneBy(array $criteria, array $orderBy = null)
 * @method Subjecttext[]    findAll()
 * @method Subjecttext[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SubjecttextRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Subjecttext::class);
    }

    // /**
    //  * @return Subjecttext[] Returns an array of Subjecttext objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Subjecttext
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
