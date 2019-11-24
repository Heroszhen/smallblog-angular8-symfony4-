<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SubjectRepository")
 */
class Subject
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $title;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Subjecttext", mappedBy="subject")
     */
    private $subjecttexts;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $plot;

    public function __construct()
    {
        $this->subjecttexts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @return Collection|Subjecttext[]
     */
    public function getSubjecttexts(): Collection
    {
        return $this->subjecttexts;
    }

    public function addSubjecttext(Subjecttext $subjecttext): self
    {
        if (!$this->subjecttexts->contains($subjecttext)) {
            $this->subjecttexts[] = $subjecttext;
            $subjecttext->setSubject($this);
        }

        return $this;
    }

    public function removeSubjecttext(Subjecttext $subjecttext): self
    {
        if ($this->subjecttexts->contains($subjecttext)) {
            $this->subjecttexts->removeElement($subjecttext);
            // set the owning side to null (unless already changed)
            if ($subjecttext->getSubject() === $this) {
                $subjecttext->setSubject(null);
            }
        }

        return $this;
    }

    public function toArray(){
        $myarray = array();
        $myarray["id"] = $this->getId();
        $myarray["title"] = $this->getTitle();
        $myarray["plot"] = $this->getPlot();
        return $myarray;
    }

    public function getPlot(): ?string
    {
        return $this->plot;
    }

    public function setPlot(?string $plot): self
    {
        $this->plot = $plot;

        return $this;
    }
}
